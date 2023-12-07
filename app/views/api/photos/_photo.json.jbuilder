json.extract! photoo, :id, :title, :description, :user_id, :tag
json.photoUrl photoo.photo.attached? ? url_for(photoo.photo) : nil