const Footer = () => {
  return (
    <footer className="w-full flex justify-center p-3 border-t border-border text-muted-foreground font-semibold">
      <p>
        Chronicle &copy;{" "}
        {new Date().toLocaleDateString("en-IN", { year: "numeric" })}
      </p>
    </footer>
  );
};

export default Footer;
