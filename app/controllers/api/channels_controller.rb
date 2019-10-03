class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    @channel.admin_id = current_user.id
    if @channel.save
      # add current member to channel
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    render :show
  end

  def index
    @channels = Channel.all
    render :index
  end

  def update
  end

  def destroy
  end

  private 
  def channel_params
    params.require(:channel).permit(:name, :topic, :is_private)
  end

end