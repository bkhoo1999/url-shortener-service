require "rails_helper"

RSpec.describe "Links", type: :request do
	describe "GET /api/links SUCCESS" do
		before do
			FactoryBot.create_list(:link, 4)
			get "/api/links"
		end
		
		it "returns all links" do
			expect(json.size).to eq(4)
		end

		it "returns status code 200" do
			expect(response).to have_http_status(:ok)
		end
	end

	describe "GET /api/links ERROR" do
		before do
			expect(Link).to receive(:all).and_return(false)
			get "/api/links"
		end

		it "returns error message of 'Failed to fetch link list'" do
			expect(json["error"]).to eq("Failed to fetch link list.")
		end
		
		it "returns status code 400" do
			expect(response).to have_http_status(:bad_request)
		end
	end

	describe "GET /api/links SUCCESS" do
		let!(:current_link) { FactoryBot.create(:link) }

		before do
			Link.stub_chain(:where, :first).and_return(current_link)
			get "/api/links/urlSlug"
		end

		it "returns status code 200" do
			expect(json["original_url"]).to eq(current_link.original_url)
		end

		it "returns status code 200" do
			expect(response).to have_http_status(:ok)
		end
	end

	describe "GET /api/links/{url_slug} ERROR" do
		before do
			Link.stub_chain(:where, :first).and_return(nil)
			get "/api/links/unknown"
		end

		it "returns error message of 'Link not found.'" do
			expect(json["error"]).to eq("Link not found.")
		end

		it "returns status code 404" do
			expect(response).to have_http_status(:not_found)
		end
	end
end