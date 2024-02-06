json.extract! photoo, :id, :title, :description, :user_id, :tag, :created_at
json.username photoo.user.username
json.photoUrl photoo.photo.attached? ? url_for(photoo.photo) : nil