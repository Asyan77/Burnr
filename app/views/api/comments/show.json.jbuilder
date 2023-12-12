


    json.extract! @comment, :id, :user_id, :photo_id, :comment, :created_at
    json.author @comment.user.username




# json.set! comment_id do
#     json.extract! comment, :user_id, :photo_id, :comment, :created_at
# end


