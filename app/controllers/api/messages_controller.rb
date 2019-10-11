class Api::MessagesController < ApplicationController
     def index
        if (params[:channelId]) 
            @messages = Message.where(messageable_id: params[:channelId], messageable_type: 'Channel')
        elsif (params[:directId])
            @messages = Message.where(messageable_id: params[:directId], messageable_type: 'Direct')
        end
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
            broadcastEdit(formatEdit(@message))
            render :show
            # broadcastEdit(@message) # If you use this method, you'll need to pass the Message by id instead of jsut teh edits you made?
        else
            render json: ['Sorry, your update did not work.'], status: 400
        end
    end

    private 
    def message_params
        params.require(:message).permit(:body, :messageable_id, :messageable_type, :user_id)
    end
    # TO DO CLEARN
    def broadcastEdit(message)
      ChatChannel.update(message)
    end

    def formatEdit(message)
        formattedMessage = {
            body: message.body,
            id: message.id,
            user_id: message.user_id,
            messageable_id: message.messageable_id,
            messageable_type: message.messageable_type,
            created_at: message.created_at,
            updated_at: message.updated_at,
            display_name: message.user.display_name,
            image_url: message.user.image_url

        }
    end

end