json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    # json.photoUrl @user.photo.attached ? url_for(@user.photo) : nil
  end