class HashtagsController < ApplicationController
  # GET /hashtags/1
  # GET /hashtags/1.json
  def show
    @hashtag = Hashtag.find(params[:id])

    respond_to do |format|
      format.js
    end
  end

  # GET /hashtags/new
  # GET /hashtags/new.json
  def new
    @hashtag = Hashtag.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @hashtag }
    end
  end

  # GET /hashtags/1/edit
  def edit
    @hashtag = Hashtag.find(params[:id])
  end

  # POST /hashtags
  # POST /hashtags.json
  def create
    @hashtag = Hashtag.new(params[:hashtag])

    respond_to do |format|
      if @hashtag.save
        format.html { redirect_to @hashtag, notice: 'Hashtag was successfully created.' }
        format.json { render json: @hashtag, status: :created, location: @hashtag }
      else
        format.html { render action: "new" }
        format.json { render json: @hashtag.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /hashtags/1
  # PUT /hashtags/1.json
  def update
    @hashtag = Hashtag.find(params[:id])

    respond_to do |format|
      if @hashtag.update_attributes(params[:hashtag])
        format.html { redirect_to @hashtag, notice: 'Hashtag was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @hashtag.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hashtags/1
  # DELETE /hashtags/1.json
  def destroy
    @hashtag = Hashtag.find(params[:id])
    @hashtag.destroy

    respond_to do |format|
      format.html { redirect_to hashtags_url }
      format.json { head :no_content }
    end
  end
end
