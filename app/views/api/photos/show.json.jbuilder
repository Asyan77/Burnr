json.set! photo.id do
    json.partial! 'photo', photoo: @photo
end 

# json.partial! 'photo', photo: @photo