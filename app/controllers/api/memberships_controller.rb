class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      broadcastNewMembership(@membership)
      render :show
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def show
    @membership = Membership.find(params[:id])
    render :show
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
  def broadcastNewMembership(membership)
     ActionCable.server.broadcast "notifications_#{membership.user_id}", {membership: membership, type: 'membershipAdd'}
  end
end
