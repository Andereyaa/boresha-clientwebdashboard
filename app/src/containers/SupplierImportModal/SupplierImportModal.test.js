import React from 'react';
import ReactDOM from 'react-dom';
import SupplierImportModal from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SupplierImportModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
