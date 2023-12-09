@photos.each do |photo|
    json.set! photo.id do
        json.partial! 'photo', photoo: photo
        json.username photo.user.username
    end 
end