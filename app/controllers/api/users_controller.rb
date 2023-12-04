class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index
    @users = User.all
    render :index
  end

  def create
      @user = User.new(user_params)
      if @user.save
          login(@user)
          # render :show
          render 'api/users/show'
      else
          render @user.errors.full_messages,  status: 422
      end
  end

  # def show
  #     @user = User.find(params[:id])
  #     @photos = Photo.all
  #     render :show
  #   end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user&.destroy
      head :no_content
      # render json: @tea
    else
      render json: ['Could not delete user'], status: 422
    end
  end

  private
  def user_params
      params.require(:user).permit(:username, :password, :email)
  end

end
