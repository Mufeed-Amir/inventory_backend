
function formatError(errors: any): { property: string; message: string }[] {
     return errors.map((error) => {
       const { property, constraints } = error;
       const [firstConstraint] = Object.values(constraints); // Extract the first constraint message
       return { property, message: firstConstraint };
     });
   }
   
module.exports = {formatError}