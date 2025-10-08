function Text({children, className}) {
    return (
        <p className={className ? className : "text-base font-normal text-black text-justify max-w-sm mt-4"}>
            {children}     
        </p>
    )
}

export default Text
