class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      cookies.signed[:user_id] = session[:user_id]
      Membership.create(user_id: @user.id, memberable_id: Channel.first.id, memberable_type: Channel)
      Membership.create(user_id: @user.id, memberable_id: Channel.second.id, memberable_type: Channel)
      login(@user)
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
    render :show
  end

  def patch
  end

  private
  def user_params
    params.require(:user).permit(:email, :display_name, :password)
  end

end
