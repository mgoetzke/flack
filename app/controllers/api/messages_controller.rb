class Api::MessagesController < ApplicationController
    def index
        @messages = Message.all
        render :index
    end

    def show
        @message = Message.find(params[:id])
        render :show
    end

    def create
        @message = Message.new(message_params)
        @message.user_id = current_user.id
        if @message.save
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end

    end

    def update
        @message = Message.find(params[:id])
        if @message.update_attributes(message_params)
            render :show
        else
            render json: ['Sorry, your update did not work.'], status: 400
        end
    end

    private 
    def message_params
        params.require(:message).permit(:body, :messageable_id, :messageable_type, :user_id)
    end
end