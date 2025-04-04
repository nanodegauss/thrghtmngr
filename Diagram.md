users ||--o{ projects : creates
users ||--o{ artworks : creates
users ||--o{ contacts : creates
users ||--o{ media : creates
users ||--o{ tasks : creates
users ||--o{ artworks_history : modifies

projects ||--o{ artworks : contains

project_categories ||--o{ projects : categorizes
artwork_categories ||--o{ artworks : categorizes
contact_categories ||--o{ contacts : categorizes

contacts ||--o{ artwork_rights_holders : associated_with

media ||--o{ artwork_rights_media : included_in

artworks ||--o{ artwork_rights_holders : relates_to
artwork_rights_holders ||--o{ artwork_rights_media : specifies

artworks ||--o{ tasks : has
artworks ||--o{ artworks_history : history

artworks ||--o{ artwork_custom_values : custom_values

users {
  UUID id PK
  string name
  string email
  string password
  string role
  string department
  boolean active
  timestamp created_at
}

projects {
  UUID id PK
  string title
  string description
  date start_date
  date end_date
  UUID category_id FK
  numeric budget
  string status
  UUID created_by FK
  timestamp created_at
}

artworks {
  UUID id PK
  string title
  string author
  string period
  string origin
  string exhibition_number
  string reference
  string image_url
  UUID project_id FK
  UUID category_id FK
  string status
  UUID created_by FK
  timestamp created_at
}

contacts {
  UUID id PK
  string name
  string contact_person
  string email
  string address
  string phone
  string notes
  UUID category_id FK
  UUID created_by FK
  timestamp created_at
}

media {
  UUID id PK
  string name
  UUID created_by FK
  timestamp created_at
}

artwork_rights_holders {
  UUID id PK
  UUID artwork_id FK
  UUID contact_id FK
  numeric price
  timestamp created_at
}

artwork_rights_media {
  UUID id PK
  UUID artwork_rights_holder_id FK
  UUID media_id FK
}

tasks {
  UUID id PK
  UUID artwork_id FK
  string description
  date due_date
  UUID created_by FK
  timestamp created_at
}

artworks_history {
  UUID id PK
  UUID artwork_id FK
  UUID modified_by FK
  timestamp modified_at
  string modified_field
  string old_value
  string new_value
}

project_categories {
  UUID id PK
  string name
  timestamp created_at
}

artwork_categories {
  UUID id PK
  string name
  timestamp created_at
}

contact_categories {
  UUID id PK
  string name
  timestamp created_at
}

artwork_custom_fields {
  UUID id PK
  string field_name
  string field_type
  string department
  timestamp created_at
}

artwork_custom_values {
  UUID id PK
  UUID artwork_id FK
  UUID field_id FK
  string value
}
