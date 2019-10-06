class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    @channel.admin_id = current_user.id
    debugger
    if @channel.save
      # TODO add current member to channel
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    @channel = Channel.find(params[:id])
    if @channel
      render :show
    else
      render json: ['Sorry, that channel does not exist.'], status: 404  
    end

  end

  def index
    @channels = Channel.all
    render :index
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update_attributes(channel_params)
      render :show
    else
      render json: ['Sorry, your update did not work.'], status: 400   
    end

  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    render :show
  end

  private 
  def channel_params
    params.require(:channel).permit(:name, :topic, :private)
  end

end