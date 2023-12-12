class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  # before_action :require_logged_in, only: [:destroy]
  # before_action :require_logged_out, only: [:create]

  def index
    @users = User.all
    render :index
  end

  def create
      @user = User.new(user_params)
      if @user.save
          login(@user)
          render 'api/users/show'
      else
          render json: {errors: @user.errors.full_messages},  status: 422
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
    else
      render json: ['Could not delete user'], status: 422
    end
  end

  private
  def user_params
      params.require(:user).permit(:username, :password, :email)
  end

end
