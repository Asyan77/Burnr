class Api::FavesController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        if params[:user_id]
            @faves = Photo.where(user_id: params[:user_id])
        else
            @photos = Photo.all
        end
        render :index
    end

    def show

    end

    def create

    end

    def update

    end

    def destroy
  
    end
  
    private
    def faves_params
        params.require(:faves).permit(:user_id, :photo_id)
    end
  
  end