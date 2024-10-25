import { Stack } from "expo-router";

export default function MedicationsLayout(){


    return(
        <Stack>
            <Stack.Screen name="index" options={{
                title:"Medicamentos"
            }}/>
            <Stack.Screen name="create" options={{
                title:"Registrar medicinas"
            }}/>
        </Stack>
    );
}