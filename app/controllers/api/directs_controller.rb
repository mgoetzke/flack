class Api::DirectsController < ApplicationController
  def create
    @direct = Direct.new(direct_params)
    @direct.name = "Direct Message";
    if @direct.save
      params[:direct][:invitedUsersIds].each do |userId|
        @membership = Membership.create(user_id: userId.to_i, memberable_id: @direct.id, memberable_type: Direct)
        new_membership = render :json => {:attachmentPartial => render_to_string('api/memberships/membership.json.jbuilder', :layout => false, :locals => { :membership => @membership })} 
        debugger
        broadcastNewMembership(new_membership)
      end
      render :show
    else
      render json: @direct.errors.full_messages, status: 422
    end
  end
  def index
    if params[:id] == "all"
      @directs = Direct.all
      render :index
    else
      @directs = User.find(params[:id]).directs
      render :index
    end
  end
  def show
  end

  private 
  def direct_params
    params.require(:direct).permit(:invitedUsers)
  end
  def broadcastNewMembership(membership)
    NotificationsChannel.broadcast_to(current_user, membership: membership, type: 'membershipAdd')
  end
end