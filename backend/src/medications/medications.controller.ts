import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MedicationsService } from '../medications/medications.service';
import { Newmedicina, Updatmedicina } from './medications.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ShedulesService } from '../shedules/shedules.service';

@UseGuards(JwtAuthGuard)
@Controller('medications')
export class MedicationsController {
    constructor(
        private readonly MServ: MedicationsService,
        private readonly shedulesService: ShedulesService // Inyecta el servicio correctamente aquí
    ) {}

    @Post('/addWithSchedule')
    async agregarMedicinaConHorario(
        @Body() medicinaData: { name: string, quantity: number, user: number, intervalo: number, finish_time: Date }
    ) {
        // Guardar medicamento en la tabla Medicina
        const nuevaMedicina = await this.MServ.createM(medicinaData);

        // Esperar un breve tiempo (opcional)
        await new Promise(resolve => setTimeout(resolve, 100));

        // Crear el horario en la tabla Shedules usando el ID de la medicina creada
        const shedulesData = {
            medicina: nuevaMedicina.id,
            user: medicinaData.user,
            intervalo: medicinaData.intervalo,
            finish_time: medicinaData.finish_time,
        };

        // Llamar al servicio de Shedules para guardar el horario
        return this.shedulesService.createS(shedulesData);
    }

    @Post()
    agregarM(@Body() medicina: Newmedicina) {
        return this.MServ.createM(medicina);
    }

    @Get()
    getAll() {
        return this.MServ.findAll();
    }

    @Get(':id')
    findMedic(@Param('id', ParseIntPipe) id: number) {
        return this.MServ.findMedicina(id);
    }

    @Patch(':id')
    actualizM(@Param('id', ParseIntPipe) id: number, @Body() updatU: Updatmedicina) {
        return this.MServ.updateM(id, updatU);
    }

    @Delete(':id')
    async deleteM(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.MServ.deleteM(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`Medicina con id ${id} no encontrada`);
            }
            throw error;
        }
    }
}
