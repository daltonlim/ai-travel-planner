import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTravelStore = create(
  persist(
    (set, get) => ({
      // Form data
      formData: {
        destination: '',
        duration: '',
        budget: '',
        interests: '',
        travelDates: '',
        groupSize: '',
        accommodationType: ''
      },
      
      // Generated itinerary
      itinerary: null,
      generatedAt: null,
      
      // Loading states
      isGenerating: false,
      error: null,
      
      // Actions
      updateFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
      })),
      
      setFormData: (data) => set({ formData: data }),
      
      setItinerary: (itineraryText) => set({
        itinerary: itineraryText,
        generatedAt: new Date().toISOString(),
        error: null
      }),
      
      setGenerating: (isGenerating) => set({ isGenerating }),
      
      setError: (error) => set({ error, isGenerating: false }),
      
      clearItinerary: () => set({
        itinerary: null,
        generatedAt: null,
        error: null
      }),
      
      resetForm: () => set({
        formData: {
          destination: '',
          duration: '',
          budget: '',
          interests: '',
          travelDates: '',
          groupSize: '',
          accommodationType: ''
        }
      }),
      
      // API call action
      generateItinerary: async () => {
        const { formData } = get();
        
        // Validation
        if (!formData.destination || !formData.duration) {
          set({ error: 'Please fill in the required fields: Destination and Duration' });
          return false;
        }
        
        set({ isGenerating: true, error: null });
        
        try {
          const response = await fetch('/api/plan-trip', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
          
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.error || 'Failed to generate itinerary');
          }
          
          set({
            itinerary: responseData.itinerary,
            generatedAt: new Date().toISOString(),
            isGenerating: false,
            error: null
          });
          
          return true;
        } catch (error) {
          console.error('Error generating itinerary:', error);
          set({
            error: error.message,
            isGenerating: false
          });
          return false;
        }
      }
    }),
    {
      name: 'travel-store', // name of the item in localStorage
      partialize: (state) => ({
        formData: state.formData,
        itinerary: state.itinerary,
        generatedAt: state.generatedAt
      }), // only persist these fields
    }
  )
);

export default useTravelStore; 