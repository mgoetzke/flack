class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      Membership.create(user_id: @user.id, memberable_id: Channel.first.id, memberable_type: Channel)
      Membership.create(user_id: @user.id, memberable_id: Channel.second.id, memberable_type: Channel)
      login(@user)
      broadcastNewUserAll(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all 
    render :index
  end

  def destroy
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def patch
  end

  private
  def user_params
    params.require(:user).permit(:email, :display_name, :password)
  end
  def broadcastNewUserAll(user)
    ActionCable.server.broadcast "notifications_all", {userId: user.id, type: 'userAdd'}
  end
end
