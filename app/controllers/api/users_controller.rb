class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
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
