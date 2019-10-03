class Api::MembershipsController < ApplicationController
  def create
    @membership = membership.new(membership_params)
    if @membership.save
      render :show
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy
    @membership = Membership.find(params[:id])
    @membership.destroy
  end

  private
  def membership_params
    params.require(:membership).permit(:user_id, :memberable_id, :memberable_type)
  end

end
