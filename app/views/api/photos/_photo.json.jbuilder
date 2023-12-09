json.extract! photoo, :id, :title, :description, :user_id, :tag, :created_at
json.photoUrl photoo.photo.attached? ? url_for(photoo.photo) : nil