export const testRoute = {
   path: "/teams/test/img/",
   method: "get",
   handler: async (req, res) => {
      try {
         const { url } = req.body;
         const fileName = decodeURIComponent(
            url.split("/").pop().split("?")[0]
         );
         console.log();
         res.status(200).json({
            success: true,
            fileName,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: "Srrver Error" });
      }
   },
};
