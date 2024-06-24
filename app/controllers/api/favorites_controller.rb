class Api::FavoritesController < ApplicationController
    before_action :require_logged_in

    def show
        @favorites = Favorite.where(user_id: params[:user_id])
        render :index
    end

    def create
        @favorite = Favortie.new(favorite_params)
        if @favorite.save
            render :show
        else
            render json: @favorite.errors.full_messages, status: 422
        end
    end

    def destroy
        @favorite = Favorite.find_by(id: params[:id])
        if @favorite&.destroy
            head :no_content
        else
            render json: ['Something went wrong'], status: 422
        end
    end

    private
    def favorite_params 
        params.require(:favorite).permit(:user_id, :photo_id)
      
    end


end