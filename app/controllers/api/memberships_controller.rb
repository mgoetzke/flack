class Api::MembershipsController < ApplicationController
  def create
    if (params[:channelId]) 
          @memberships = Membership.where(memberable_id: params[:channelId], memberable_type: 'Channel')
      elsif (params[:directId])
          @memberships = Membership.where(memberable_id: params[:channelId], memberable_type: 'Channel')
      end
      render :index
  end

  def index
    @memberships = Membership.all
    render :index
  end

  def destroy
    @membership = Membership.find(params[:id])
    @membership.destroy
  end

  private
  def membership_params
    params.require(:membership).permit(:user_id, :memberable_id, :memberable_type)
  end

  #TODOCLEAN
  def broadcastNewMembership(membership)
      WebNotificationsChannel.sendMembership(membership)
  end

end
