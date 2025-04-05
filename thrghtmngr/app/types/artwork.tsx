export interface Artwork {
    id: string
    status: "available" | "on_display" | "stored" | "on_loan"
    thumbnail: string
    title: string
    author: string
    project: string
    exhibitNumber: string
    location: string
    origin: string
    rightsFee: number
  }