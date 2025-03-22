
// Export all order utility functions
export * from './fetchOrders';
export * from './saveOrder';
export * from './updateOrder';
export * from './types';
export * from './utils';

// Export function to convert JSON to order items
export function convertJsonToOrderItems(jsonData: any): any[] {
  if (!jsonData) return [];
  
  if (typeof jsonData === 'string') {
    try {
      return JSON.parse(jsonData);
    } catch (e) {
      console.error('Error parsing JSON data:', e);
      return [];
    }
  }
  
  if (Array.isArray(jsonData)) {
    return jsonData;
  }
  
  return [];
}
