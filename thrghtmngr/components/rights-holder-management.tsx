/**
 * Composant pour la gestion des ayants droit d'une œuvre d'art
 * 
 * Permet de visualiser, ajouter, modifier et supprimer des ayants droit
 * pour une œuvre d'art spécifique.
 * 
 * @component
 */
"use client"

import { useState, useEffect } from "react";
import { 
  useRightsHoldersByArtwork, 
  useCreateRightsHolder, 
  useUpdateRightsHolder, 
  useDeleteRightsHolder,
  useTotalRightsCost,
  useAddMediaToRightsHolder,
  useRemoveMediaFromRightsHolder
} from "@/hooks/useRightsHolders";
import { useMedias } from "@/hooks/useMedia";
import { 
  mockContacts, 
  mockMedia, 
  mockArtworkRightsHolders, 
  mockArtworkRightsMedia 
} from "@/mocks/data";
import { ArtworkRightsHolderWithRelations, Contact } from "@/types";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

import {
  CheckIcon,
  CircleDollarSignIcon,
  PencilIcon,
  PlusCircleIcon,
  SaveIcon,
  TrashIcon,
  UserCircleIcon,
  XIcon
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schéma de validation pour le formulaire de création d'ayant droit
const rightsHolderFormSchema = z.object({
  contact_id: z.string({
    required_error: "Veuillez sélectionner un contact"
  }),
  price: z.coerce.number()
    .min(0, "Le prix doit être positif")
    .default(0),
  media: z.array(z.string()).optional()
});

type RightsHolderFormValues = z.infer<typeof rightsHolderFormSchema>;

interface RightsHolderManagementProps {
  artworkId: string;
  onClose?: () => void;
}

export function RightsHolderManagement({ artworkId, onClose }: RightsHolderManagementProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Récupérer les données avec React Query
  const { 
    data: rightsHolders = [], 
    isLoading: isLoadingRightsHolders 
  } = useRightsHoldersByArtwork(artworkId);
  
  const { data: totalCost = 0 } = useTotalRightsCost(artworkId);
  const { data: allMedia = [] } = useMedias();
  
  // Mutations pour les opérations CRUD
  const createRightsHolderMutation = useCreateRightsHolder();
  const updateRightsHolderMutation = useUpdateRightsHolder();
  const deleteRightsHolderMutation = useDeleteRightsHolder();
  const addMediaToRightsHolderMutation = useAddMediaToRightsHolder();
  const removeMediaFromRightsHolderMutation = useRemoveMediaFromRightsHolder();
  
  // Formulaire pour la création/édition d'un ayant droit
  const form = useForm<RightsHolderFormValues>({
    resolver: zodResolver(rightsHolderFormSchema),
    defaultValues: {
      contact_id: "",
      price: 0,
      media: []
    }
  });
  
  // Réinitialiser le formulaire pour l'édition
  useEffect(() => {
    if (editingId) {
      const rightsHolder = rightsHolders.find(rh => rh.id === editingId);
      if (rightsHolder) {
        // Récupérer les IDs des médias associés
        const mediaIds = rightsHolder.media_rights?.map(mr => mr.media_id) || [];
        
        form.reset({
          contact_id: rightsHolder.contact_id,
          price: rightsHolder.price,
          media: mediaIds
        });
      }
    } else {
      form.reset({
        contact_id: "",
        price: 0,
        media: []
      });
    }
  }, [editingId, rightsHolders, form]);
  
  // Gérer la soumission du formulaire
  const onSubmit = async (values: RightsHolderFormValues) => {
    try {
      if (editingId) {
        // Mise à jour d'un ayant droit existant
        await updateRightsHolderMutation.mutateAsync({
          id: editingId,
          data: {
            contact_id: values.contact_id,
            price: values.price
          }
        });
        
        // Mettre à jour les médias associés
        // D'abord, récupérer l'ayant droit actuel avec ses médias
        const currentRightsHolder = rightsHolders.find(rh => rh.id === editingId);
        if (currentRightsHolder) {
          // Médias actuels
          const currentMediaIds = currentRightsHolder.media_rights?.map(mr => mr.media_id) || [];
          // Médias à ajouter
          const mediaToAdd = values.media?.filter(m => !currentMediaIds.includes(m)) || [];
          // Médias à supprimer
          const mediaToRemove = currentMediaIds.filter(m => !values.media?.includes(m));
          
          // Ajouter les nouveaux médias
          for (const mediaId of mediaToAdd) {
            await addMediaToRightsHolderMutation.mutateAsync({
              rightsHolderId: editingId,
              mediaId
            });
          }
          
          // Supprimer les médias qui ne sont plus associés
          for (const mediaId of mediaToRemove) {
            await removeMediaFromRightsHolderMutation.mutateAsync({
              rightsHolderId: editingId,
              mediaId
            });
          }
        }
        
        toast.success("Ayant droit mis à jour avec succès");
      } else {
        // Création d'un nouvel ayant droit
        const newRightsHolder = await createRightsHolderMutation.mutateAsync({
          artwork_id: artworkId,
          contact_id: values.contact_id,
          price: values.price
        });
        
        // Ajouter les médias sélectionnés
        if (values.media && values.media.length > 0) {
          for (const mediaId of values.media) {
            await addMediaToRightsHolderMutation.mutateAsync({
              rightsHolderId: newRightsHolder.id,
              mediaId
            });
          }
        }
        
        toast.success("Ayant droit ajouté avec succès");
      }
      
      // Réinitialiser le formulaire
      form.reset({
        contact_id: "",
        price: 0,
        media: []
      });
      setEditingId(null);
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de l'ayant droit");
      console.error("Erreur:", error);
    }
  };
  
  // Gérer la suppression d'un ayant droit
  const handleDelete = async (id: string) => {
    try {
      await deleteRightsHolderMutation.mutateAsync({ id, artworkId });
      toast.success("Ayant droit supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'ayant droit");
      console.error("Erreur:", error);
    }
  };
  
  // Formatage des informations de contact
  const getContactInfo = (contactId: string) => {
    const contact = mockContacts.find(c => c.id === contactId);
    return contact 
      ? `${contact.name} (${contact.contact_person})` 
      : "Contact inconnu";
  };
  
  // Récupération des médias d'un ayant droit
  const getRightsHolderMedia = (rightsHolder: ArtworkRightsHolderWithRelations) => {
    if (!rightsHolder.media_rights || rightsHolder.media_rights.length === 0) {
      return "Aucun support";
    }
    
    return rightsHolder.media_rights
      .map(mr => mr.media?.name || "Support inconnu")
      .join(", ");
  };
  
  if (isLoadingRightsHolders) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-xl flex items-center">
          <CircleDollarSignIcon className="w-5 h-5 mr-2" />
          Gestion des ayants droit
        </CardTitle>
        <CardDescription>
          Gérez les ayants droit et leurs tarifs pour cette œuvre
        </CardDescription>
      </CardHeader>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Résumé des droits */}
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="text-lg">Résumé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Nombre d'ayants droit
                </div>
                <div className="text-2xl font-semibold">
                  {rightsHolders.length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Coût total des droits
                </div>
                <div className="text-2xl font-semibold text-emerald-600">
                  {formatPrice(totalCost)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire d'ajout/édition */}
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle className="text-lg">
              {editingId ? "Modifier un ayant droit" : "Ajouter un ayant droit"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="contact_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un contact" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockContacts.map((contact: Contact) => (
                            <SelectItem key={contact.id} value={contact.id}>
                              {contact.name} ({contact.contact_person})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix (€)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0} 
                          step={0.01}
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="media"
                  render={() => (
                    <FormItem>
                      <div className="mb-2">
                        <FormLabel>Supports autorisés</FormLabel>
                        <FormDescription>
                          Sélectionnez les supports pour lesquels les droits s'appliquent
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {allMedia.map((media) => (
                          <FormField
                            key={media.id}
                            control={form.control}
                            name="media"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={media.id}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(media.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValue, media.id])
                                          : field.onChange(
                                              currentValue.filter((value) => value !== media.id)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {media.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2 pt-2">
                  {editingId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingId(null)}
                    >
                      <XIcon className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  )}
                  <Button type="submit" className="flex items-center gap-2">
                    {editingId ? (
                      <>
                        <SaveIcon className="w-4 h-4" />
                        Mettre à jour
                      </>
                    ) : (
                      <>
                        <PlusCircleIcon className="w-4 h-4" />
                        Ajouter
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Liste des ayants droit */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ayants droit actuels</CardTitle>
        </CardHeader>
        <CardContent>
          {rightsHolders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Tarif</TableHead>
                  <TableHead className="hidden md:table-cell">Supports</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rightsHolders.map((rightsHolder) => (
                  <TableRow key={rightsHolder.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="w-4 h-4 text-muted-foreground" />
                        {getContactInfo(rightsHolder.contact_id)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono">
                        {formatPrice(rightsHolder.price)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {rightsHolder.media_rights && rightsHolder.media_rights.length > 0 ? (
                          rightsHolder.media_rights.map((mr) => (
                            <Badge key={mr.id} variant="outline">
                              {mr.media?.name || "Support inconnu"}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">Aucun support</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setEditingId(rightsHolder.id)}
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                            >
                              <TrashIcon className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirmer la suppression
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet ayant droit ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleDelete(rightsHolder.id)}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              Aucun ayant droit n'est associé à cette œuvre
            </div>
          )}
        </CardContent>
        {onClose && (
          <CardFooter className="flex justify-end border-t p-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}