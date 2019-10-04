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
        # THIS METHOD INTENTIONALLY LEFT BLANK
        # Messages created via Action Cable websocket
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