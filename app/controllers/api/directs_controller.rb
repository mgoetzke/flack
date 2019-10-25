class Api::DirectsController < ApplicationController
  def create
    @direct = Direct.new(direct_params)
    @direct.name = "Direct Message";
    if @direct.save
      params[:direct][:invitedUsersIds].each do |userId|
        Membership.create(user_id: userId.to_i, memberable_id: @direct.id, memberable_type: Direct)
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
end