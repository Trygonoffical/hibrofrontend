'use client'

import { useSearchParams } from 'next/navigation';
import BulkOrderRequestForm from '@/components/Quotaion/BulkOrderRequestForm';
import QuotationSuccess from '@/components/Quotaion/QuotationSuccess';
import UserQuotations from '@/components/Quotaion/UserQuotations';

const QuotationPage = () => {
  // Use useSearchParams to get query parameters
  const searchParams = useSearchParams();
  const product = searchParams.get('product'); // This will now be a slug, not an ID
  const view = searchParams.get('view');

  // Render different components based on the 'view' parameter
  if (view === 'success') {
    return <QuotationSuccess />;
  } else if (view === 'history') {
    return <UserQuotations />;
  } else {
    // Default to BulkOrderRequestForm
    return <BulkOrderRequestForm />;
  }
}

export default QuotationPage;