json.set! user_id do
    json.extract! user :user_id, :email, :username 
end