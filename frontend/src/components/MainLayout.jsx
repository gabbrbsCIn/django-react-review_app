


function MainLayout({ title, children }) {
  return (
    <div className='flex flex-col'>
      <div className='flex px-36 pt-20 text-2xl'>
        <h1 className='py-5 font-semibold mr-5'>{title}</h1>
      </div>
      <div className='flex flex-row flex-wrap'>
        {children}
      </div>
    </div>
  );
};


export default MainLayout;