if @comments
    @comments.each do |comment|
        json.set! comment.id do
            json.extract! comment, :user_id, :photo_id, :comment, :created_at
            json.author comment.user.username
        end 
    end
end

# json.set! comment_id do
#     json.extract! comment, :user_id, :photo_id, :comment, :created_at
# end


