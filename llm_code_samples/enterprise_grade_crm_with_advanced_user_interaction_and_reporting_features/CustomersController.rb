# app/controllers/customers_controller.rb

class CustomersController < ApplicationController
  before_action :authenticate_user!

  def index
    @customers = Customer.all
    render json: @customers
  end

  def create
    @customer = Customer.new(customer_params)
    
    if @customer.save
      render json: @customer, status: :created
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def import
    file = params[:file]
    if file.content_type == 'text/csv'
      CSV.foreach(file.path, headers: true) do |row|
        Customer.create! row.to_hash
      end
    elsif file.content_type == 'application/json'
      JSON.parse(file.read).each do |item|
        Customer.create! item
      end
    end

    head :ok
  end

  private

  def customer_params
    params.require(:customer).permit(:name, :email)
  end
end