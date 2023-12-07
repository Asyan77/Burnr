class Api::PhotosController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @photos = Photo.all
        render :index
    end

    def show
        @photo = Photo.find(id: params[:id])
        render :show
    end

    def create
        @photo = Photo.new(photo_params)
        if @photo.save!
            render :show
        else
            render json: @photo.errors.full_messages, status: 422
        end
    end

    def update
        @photo = Photo.find_by(id)
        if @photo.update(photo_params)
            render :show
        else
            render json: @photo.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @photo = Photo.find_by(id: params[:id])
        if @photo&.destroy
            render :index
        else
          render json: ['Something went wrong'], status: 422
        end
    end
  
    private
    def photo_params
        params.require(:photo).permit(:user_id, :title, :description, :tag)
    end
  
  end