# json.set! comment_id do
#     json.extract! comment :user_id, :photo_id, :comment 
# end

@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :user_id, :photo_id, :comment 
        json.author comment.user.username
    end 
end

