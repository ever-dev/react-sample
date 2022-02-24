import { AirlineAccount, AirlinesData } from 'app/pages/Organizations/store/types';

const mockAirlines: AirlineAccount[] = [
  {
    id: 179,
    organization: 288,
    airline: 'UA',
    airline_name: 'United Airlines',
    account_number: '111003312',
    air_waybill_number_airline_prefix: '016',
    shipment_weight_limit: 75,
    available_awb_number_count: 40,
  },
  {
    id: 178,
    organization: 288,
    airline: 'AS',
    airline_name: 'Alaska Airlines',
    account_number: '31666771',
    air_waybill_number_airline_prefix: '027',
    shipment_weight_limit: 0,
    available_awb_number_count: 39,
  },
  {
    id: 177,
    organization: 288,
    airline: 'DL',
    airline_name: 'Delta Air Lines',
    account_number: '8946651',
    air_waybill_number_airline_prefix: '006',
    shipment_weight_limit: 0,
    available_awb_number_count: 39,
  },
  {
    id: 176,
    organization: 288,
    airline: 'WN',
    airline_name: 'Southwest Airlines',
    account_number: '32021',
    air_waybill_number_airline_prefix: '526',
    shipment_weight_limit: 50,
    available_awb_number_count: 92,
  },
  {
    id: 175,
    organization: 288,
    airline: 'AA',
    airline_name: 'American Airlines',
    account_number: '989361',
    air_waybill_number_airline_prefix: '001',
    shipment_weight_limit: 0,
    available_awb_number_count: 38,
  },
];

export const mockAirlinesData: AirlinesData = {
  items: mockAirlines,
  total_count: mockAirlines.length,
};
