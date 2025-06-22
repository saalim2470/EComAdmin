import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import ProductInputs from "../../components/product/ProductInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";

function CreateProducts() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Create Product" />
      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-2"> */}
      {/* <div className="space-y-6"> */}
      <ProductInputs />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default CreateProducts;
