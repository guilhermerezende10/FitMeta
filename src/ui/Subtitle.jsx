function Subtitle({children, className}) {
    const StyledSubtitle = "text-sm font-bold text-gray-400 text-center";
    return (
        <h2 className={className ? className : StyledSubtitle}>
            {children}
        </h2>
    )
}

export default Subtitle
