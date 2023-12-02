json.extract! photo, :id, :title, :description, :user_id
json.photoUrl photo.photo.attached? ? url_for(photo.photo) : nil