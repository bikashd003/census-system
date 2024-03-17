import {
  Table,
  Container,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import moment from "moment";
interface Person {
  name: string;
  gender: string;
  birthdate: string;
  is_vaccinated: boolean;
}

interface censusProps {
  censusData: Person[];
}

const CensusTable = ({ censusData }: censusProps) => {
  return (
   <div className="w-[60vw] h-[35vh] overflow-auto">
     <Container maxWidth="lg">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Vaccinated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {censusData.map((person, index) => (
            <TableRow key={index.toString()}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.gender}</TableCell>
              <TableCell>{moment(person.birthdate).format('DD-MM-YYYY')}</TableCell>
              <TableCell>
                {person.is_vaccinated? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
   </div>
  );
};

export default CensusTable;
