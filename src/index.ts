import urlTemplate from "url-template";

type ExpandFunc = (query?: object) => string;

interface Template {
  readonly rfc6570: string;
  readonly expand: ExpandFunc;
}

interface ListItem {
  readonly href: string;
  readonly templated: boolean;
}

interface ListItems {
  [name: string]: ListItem;
}

interface Definitions {
  readonly [name: string]: string;
}

function qargs(...parts: string[]): string {
  return `{?${parts.join(",")}}`;
}

const definitions: Definitions = {
  root: "/",

  hotel_enquiry:
    "/api/properties/{property_id}/room-types/{id}/enquiry{?months,offset,nights,currency,timezone_offset,max_date}",
  hotel_reservation:
    "/api/properties/{property_id}/room-types/{room_type_id}/reservations/{id}",
  hotel_reservation_history:
    "/api/hotels/reservations/{item_id}/history{?limit,offset,page}",
  properties: "/api/properties{?id_salesforce_external,limit,page}",
  property: "/api/properties/{id}",
  room_type: "/api/properties/{property_id}/room-types/{id}",
  included_guests:
    "/api/properties/{property_id}/room-types/{id}/included-guests",
  room_type_availability:
    "/api/properties/{property_id}/room-types/{id}/availability",
  room_types: "/api/properties/{property_id}/room-types",

  amenities: "/api/amenities",

  tour: "/api/tours/{id}",
  tour_enquiry:
    "/api/tours/{tour_id}/tour-options/{id}/enquiry{?days,timezone_offset}",
  tour_leg: "/api/tours/{tour_id}/tour-legs/{id}",
  tour_legs: "/api/tours/{tour_id}/tour-legs",
  tour_option: "/api/tours/{tour_id}/tour-options/{id}",
  tour_option_dates: "/api/tours/{tour_id}/tour-options/{tour_option_id}/dates",
  tour_option_date:
    "/api/tours/{tour_id}/tour-options/{tour_option_id}/dates/{id}",
  tour_options: "/api/tours/{tour_id}/tour-options",
  tour_reservation:
    "/api/tours/{tour_id}/tour-options/{tour_option_id}/reservations/{id}",
  tour_reservation_history:
    "/api/tours/reservations/{item_id}/history{?limit,offset,page}",
  tours: "/api/tours{?id_salesforce_external,limit,page}",

  public_offer_filters:
    "/api/public-offer-filters{?brand,region,type,locations,holiday_types,benefit_types,campaigns,memberships}",

  public_offers:
    "/api/public-offers" +
    qargs(
      "page",
      "limit",
      "platform",
      "region",
      "brand",
      "locations",
      "holiday_types",
      "campaigns",
      "benefit_types",
      "strategy_applied",
      "exclude_offer_ids",
      "offer_ids",
      "slim",
      "flight_origin",
      "user_id",
      "recommendation_id",
      "sort_by",
      "memberships",
      "only_ids",
      "type*",
      "flexible_packages",
      "lowest_price_only"
    ),

  public_offer:
    "/api/public-offers/{id}" +
    qargs(
      "platform",
      "region",
      "brand",
      "all_packages",
      "flight_origin",
      "user_id",
      "memberships",
      "provider*",
      "flexible_packages"
    ),

  public_offer_packages:
    "/api/public-offers/{offer_id}/packages" +
    qargs("region", "brand", "all_packages"),

  vendor: "/api/vendor/{id}",
  vendor_offers: "/api/vendor-offers{?email}",

  offer: "/api/offers/{id}{?platform,region,filter,brand}",
  offer_image: "/api/offers/{offer_id}/images/{id}",
  offer_images: "/api/offers/{offer_id}/images",
  offer_package: "/api/offers/{offer_id}/packages/{id}",
  offer_packages: "/api/offers/{offer_id}/packages",
  offer_schedule: "/api/offers/{offer_id}/schedules/{id}",
  offer_schedules: "/api/offers/{offer_id}/schedules{?brand}",
  offers: "/api/offers{?page,limit,platform,region,filter,brand}{&type*}",
  offers_content: "/api/offers-content{?brand}{&limit}",
  offers_search: "/api/offers-search{?q}{&brand,limit}",

  ee_public_category_list: "/api/ee/offers-public/category-list{?brand}",
  ee_public_offer: "/api/ee/offers-public/{id}{?platform,region}",
  ee_public_offers:
    "/api/ee/offers-public{?page,limit,platform,region}{&type*}",
  ee_vendor_offers: "/api/ee/vendor-offers{?email}",

  ee_hero_assignment: "/api/ee/hero_assignments/{region}{?platform}",
  ee_hero_assignments: "/api/ee/hero_assignments{?platform}",
  ee_inventory: "/api/ee/inventories/{inventory_id}",
  ee_inventory_public_status:
    "/api/ee/inventories/public-status/{inventory_id}",
  ee_inventory_voucher: "/api/ee/vouchers/{inventory_id}/{voucher_code}",
  ee_offer: "/api/ee/offers/{id}{?platform,region,filter}",
  ee_offer_image: "/api/ee/offers/{offer_id}/images/{id}",
  ee_offer_images: "/api/ee/offers/{offer_id}/images",
  ee_offer_package: "/api/ee/offers/{offer_id}/packages/{id}",
  ee_offer_packages: "/api/ee/offers/{offer_id}/packages",
  ee_offers: "/api/ee/offers{?page,limit,platform,region,filter}{&type*}",
  ee_offers_feed: "/api/ee/offers-feed{?consumer,token,brand}",
  ee_offers_regions: "/api/ee/offers-regions{?brand}",
  ee_redemption_location: "/api/ee/redemption-location/{id}",

  ee_top_pick: "/api/ee/top-picks/{region}{?platform}",
  ee_top_picks: "/api/ee/top-picks{?platform}",

  ee_top_picks_heading: "/api/ee/top-picks-heading{?platform,region,page}",
  ee_top_picks_headings: "/api/ee/top-picks-headings{?platform,region}",

  voucher: "/api/vouchers/{vendor_id}/{offer_id}/{voucher_code}",
  voucher_status: "/api/vouchers/public-status/{vendor_id}/{offer_id}",

  users: "/api/users/{user_id}" + qargs("brand"),
  user_memberships: "/api/users/{user_id}/memberships" + qargs("brand"),

  credits: "/api/credits{?id_member,currency}",
  order: "/api/orders/{id}",
  orders:
    "/api/orders" +
    qargs(
      "page",
      "per_page",
      "order_by",
      "order_direction",
      "customer_id",
      "vendor_id",
      "utm_source",
      "le_label",
      "le_attribution",
      "updated_since",
      "booking_numbers"
    ),
  orders_addons: "/api/orders/addons/{addon_opportunity_id}",
  payments: "/api/payments{?id_orders}",

  ee_order: "/api/ee/orders/{id}",
  ee_orders:
    "/api/ee/orders{?page,per_page,order_by,order_direction,customer_id,vendor_id,utm_source,le_label,le_attribution,updated_since}",

  giftcard_terms_and_conditions: "/legal/giftcard-terms-and-conditions",
  how_we_calculate_percentage_off: "/legal/how-we-calculate-percentage-off",
  legal: "/legal",
  regions: "/regions" + qargs("brand", "no_detect"),

  about_us: "/info/about-us",
  info: "/info",
  why_work_with_us: "/info/why-work-with-us",

  faq: "/faq",

  calendar_months:
    "/api/calendar/months" +
    qargs(
      "offer_id",
      "package_id",
      "origin",
      "region",
      "number_of_adults",
      "number_of_children",
      "number_of_infants",
      "number_of_packages",
      "provider*",
      "min_date",
      "match_surcharge"
    ),

  calendar_days:
    "/api/calendar/days" +
    qargs(
      "offer_id",
      "package_id",
      "origin",
      "region",
      "number_of_nights",
      "number_of_adults",
      "number_of_children",
      "number_of_infants",
      "number_of_packages",
      "provider*",
      "min_date",
      "match_surcharge"
    ),

  flight_single_cheapest:
    "/api/flights/single-cheapest-search" +
    qargs(
      "start_date",
      "end_date",
      "origin",
      "destination",
      "currency",
      "number_of_adults",
      "number_of_nights",
      "brand",
      "provider*",
      "region"
    ),

  flight_fare_rules:
    "/api/flights/fare-rules{?journey_id,provider,carrier,booking_class}",

  flight_airports:
    "/api/flights/airports" + qargs("brand", "region", "latitude", "longitude"),

  addon: "/api/offers/{offer_id}/packages/{package_id}/addons/{id}",
  addons: "/api/offers/{offer_id}/packages/{package_id}/addons",
  vendor_addon: "/vendor-addons/{vendor_id}/opportunities/{addon_id}",
  vendor_addons: "/vendor-addons/{vendor_id}",
  all_addons: "/api/offers/addons/all/{?limit,page}",

  partnership: "/api/loyalty/partnerships/{code}",
  partnerships:
    "/api/loyalty/partnerships" + qargs("brand", "region", "currency"),
  membership: "/api/loyalty/memberships/{code}",
  memberships:
    "/api/loyalty/memberships" + qargs("brand", "region", "currency"),
  memberships_limits:
    "/api/loyalty/memberships/limits" +
    qargs("brand", "customer_id", "membership_code", "membership_number"),
  wishlist: "/api/wishlist",

  current_user: "/api/users/current" + qargs("brand")
};

function build(rfc6570: string): Template {
  const builder = urlTemplate.parse(rfc6570);
  return {
    expand: (query): string => builder.expand(query),
    rfc6570
  };
}

export function get(name: string): Template {
  const rfc6570 = definitions[name];
  return build(rfc6570);
}

export function mock(rfc6570: string): Template {
  return build(rfc6570);
}

export function list(): ListItems {
  return Object.keys(definitions).reduce((acc: ListItems, key: string) => {
    acc[key] = {
      href: get(key).rfc6570,
      templated: true
    };
    return acc;
  }, {});
}
