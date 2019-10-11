class Api::DirectsController < ApplicationController
  def create
    @direct = Direct.new()
    @direct.name ="dm"
    if @direct.save
      params[:direct][:invitedUsersIds].each do |user|
        Membership.create(user_id: user.to_i, memberable_id: @direct.id, memberable_type: Direct)
      end
      render :show
    else
      render json: @direct.errors.full_messages, status: 422
    end
  end
  def show
    @direct = Direct.find(params[:id])
    if @direct
      render :show
    else
      render json: ['Sorry, that direct does not exist.'], status: 404  
    end

  end
  def index
    @directs = Direct.all
    render :index
  end
  def show
  end
end