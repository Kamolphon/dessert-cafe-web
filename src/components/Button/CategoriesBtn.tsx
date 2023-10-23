function categoriesBtn() {
    return (
        <div className="md:mx-8 lg:mx-12 w-full flex ml-3 mt-6 md:text-xl text-sm font-light items-center">
            <p className="text-black mr-3 flex">Categories: </p>
            <a className="button-categories md:w-24" href="#Ice Cream">Ice Cream</a>
            <a className="button-categories md:w-24" href="#Cake">Cake</a>
            <a className="button-categories md:w-24" href="#Milkshake">Milkshake</a>
            <a className="button-categories md:w-24" href="#Others">Others</a>
        </div>
    )
}

export default categoriesBtn