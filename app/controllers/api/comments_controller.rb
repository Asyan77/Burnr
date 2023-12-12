class Api::CommentsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        if params[:photo_id]
            @comments = Comment.where(photo_id: params[:photo_id])
        else
             @comments = Comment.all
        end
        render :index
    end

    # def show
    #     @comments = Comment.find_by(photo_id: params[:photo_id])
    #     render :show
    # end

    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update
        @comment = Comment.find_by(id)
        if @comment.update(photo_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment&.destroy
            head :no_content
        else
          render json: ['Something went wrong'], status: 422
        end
    end
  
    private
    def comment_params
        params.require(:comment).permit(:user_id, :photo_id, :comment)
    end
  
  end